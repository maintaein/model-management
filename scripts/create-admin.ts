import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 커맨드 라인 인자 파싱
  const args = process.argv.slice(2)
  const emailIndex = args.indexOf('--email')
  const passwordIndex = args.indexOf('--password')

  if (emailIndex === -1 || passwordIndex === -1) {
    console.error('사용법: npm run create-admin -- --email <이메일> --password <비밀번호>')
    process.exit(1)
  }

  const email = args[emailIndex + 1]
  const password = args[passwordIndex + 1]

  if (!email || !password) {
    console.error('이메일과 비밀번호를 모두 입력해주세요')
    process.exit(1)
  }

  // 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    console.error('올바른 이메일 형식이 아닙니다')
    process.exit(1)
  }

  // 비밀번호 길이 검증
  if (password.length < 8) {
    console.error('비밀번호는 최소 8자 이상이어야 합니다')
    process.exit(1)
  }

  try {
    // 기존 관리자 확인
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    })

    if (existingAdmin) {
      console.error(`이미 존재하는 이메일입니다: ${email}`)
      process.exit(1)
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10)

    // 관리자 생성
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    console.log('✓ 관리자 계정이 생성되었습니다')
    console.log(`  이메일: ${admin.email}`)
    console.log(`  ID: ${admin.id}`)
  } catch (error) {
    console.error('관리자 생성 중 오류가 발생했습니다:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
