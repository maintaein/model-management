import { PrismaClient } from '@prisma/client'
import * as readline from 'readline'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise(resolve => rl.question(query, (answer: string) => {
    rl.close()
    resolve(answer)
  }))
}

async function cleanTestData() {
  try {
    await prisma.$connect()

    // 현재 데이터 확인
    const modelCount = await prisma.model.count()
    const archiveCount = await prisma.archive.count()
    const adminCount = await prisma.admin.count()

    console.log('\n=== 현재 데이터 ===')
    console.log(`Model: ${modelCount}개`)
    console.log(`Archive: ${archiveCount}개`)
    console.log(`Admin: ${adminCount}개 (관리자 계정은 제외됩니다)`)
    console.log('==================\n')

    if (modelCount === 0 && archiveCount === 0) {
      console.log('✅ 정리할 테스트 데이터가 없습니다.')
      return
    }

    // 확인 질문
    const answer = await askQuestion(
      '⚠️  Model과 Archive 데이터를 모두 삭제하시겠습니까? (y/n): '
    )

    if (answer.toLowerCase() !== 'y') {
      console.log('취소되었습니다.')
      return
    }

    // 데이터 삭제 (외래키 순서 주의)
    console.log('\n삭제 중...')
    const deletedArchives = await prisma.archive.deleteMany({})
    const deletedModels = await prisma.model.deleteMany({})

    console.log(`\n✅ 정리 완료!`)
    console.log(`  - Archive: ${deletedArchives.count}개 삭제`)
    console.log(`  - Model: ${deletedModels.count}개 삭제`)
    console.log(`  - Admin: 유지됨 (${adminCount}개)\n`)

  } catch (error) {
    console.error('❌ 데이터 정리 중 오류:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanTestData()
