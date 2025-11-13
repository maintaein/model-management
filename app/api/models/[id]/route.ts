import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { modelSchema } from '@/types/model'

interface RouteContext {
  params: Promise<{
    id: string
  }>
}

// GET /api/models/[id] - 모델 상세 조회
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params

    const model = await prisma.model.findUnique({
      where: { id },
      include: {
        archives: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!model) {
      return NextResponse.json(
        { error: '모델을 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: model })
  } catch (error) {
    console.error('모델 조회 오류:', error)
    return NextResponse.json(
      { error: '모델을 불러오는데 실패했습니다' },
      { status: 500 }
    )
  }
}

// PATCH /api/models/[id] - 모델 수정 (관리자 인증 필요)
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // 관리자 인증 체크
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: '인증이 필요합니다' },
        { status: 401 }
      )
    }

    const { id } = await context.params
    const body = await request.json()

    // Zod 검증 (부분 업데이트)
    const validationResult = modelSchema.partial().safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: '입력값이 올바르지 않습니다',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // slug 수정 시 중복 체크
    if (data.slug) {
      const existingModel = await prisma.model.findUnique({
        where: { slug: data.slug },
      })

      if (existingModel && existingModel.id !== id) {
        return NextResponse.json(
          { error: '이미 존재하는 slug입니다' },
          { status: 409 }
        )
      }
    }

    // 모델 수정
    const model = await prisma.model.update({
      where: { id },
      data: {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.slug !== undefined && { slug: data.slug }),
        ...(data.category !== undefined && { category: data.category }),
        ...(data.nationality !== undefined && { nationality: data.nationality }),
        ...(data.profileImage !== undefined && { profileImage: data.profileImage }),
        ...(data.images !== undefined && { images: data.images }),
        ...(data.bio !== undefined && { bio: data.bio }),
        ...(data.height !== undefined && { height: data.height }),
        ...(data.measurements !== undefined && { measurements: data.measurements }),
        ...(data.instagram !== undefined && { instagram: data.instagram }),
      },
    })

    return NextResponse.json({ data: model })
  } catch (error) {
    // Prisma 에러 처리
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: '모델을 찾을 수 없습니다' },
          { status: 404 }
        )
      }
    }

    console.error('모델 수정 오류:', error)
    return NextResponse.json(
      { error: '모델 수정에 실패했습니다' },
      { status: 500 }
    )
  }
}

// DELETE /api/models/[id] - 모델 삭제 (관리자 인증 필요)
export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // 관리자 인증 체크
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: '인증이 필요합니다' },
        { status: 401 }
      )
    }

    const { id } = await context.params

    // 모델 삭제 (cascade로 연관된 Archive도 자동 삭제됨)
    await prisma.model.delete({
      where: { id },
    })

    return NextResponse.json({
      message: '모델이 삭제되었습니다',
    })
  } catch (error) {
    // Prisma 에러 처리
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: '모델을 찾을 수 없습니다' },
          { status: 404 }
        )
      }
    }

    console.error('모델 삭제 오류:', error)
    return NextResponse.json(
      { error: '모델 삭제에 실패했습니다' },
      { status: 500 }
    )
  }
}
