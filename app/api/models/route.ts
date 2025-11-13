import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { modelSchema } from '@/types/model'
import type { Category } from '@prisma/client'

// GET /api/models - 모델 목록 조회 (필터링, 페이지네이션)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') as Category | null
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)

    // 페이지네이션 계산
    const skip = (page - 1) * limit

    // 필터 조건 구성
    const where =
      category && category !== 'ALL' ? { category } : {}

    // 모델 목록 조회 및 총 개수
    const [models, total] = await Promise.all([
      prisma.model.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.model.count({ where }),
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      data: models,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    })
  } catch (error) {
    console.error('모델 목록 조회 오류:', error)
    return NextResponse.json(
      { error: '모델 목록을 불러오는데 실패했습니다' },
      { status: 500 }
    )
  }
}

// POST /api/models - 모델 생성 (관리자 인증 필요)
export async function POST(request: NextRequest) {
  try {
    // 관리자 인증 체크
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: '인증이 필요합니다' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Zod 검증
    const validationResult = modelSchema.safeParse(body)
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

    // slug 중복 체크
    const existingModel = await prisma.model.findUnique({
      where: { slug: data.slug },
    })

    if (existingModel) {
      return NextResponse.json(
        { error: '이미 존재하는 slug입니다' },
        { status: 409 }
      )
    }

    // 모델 생성
    const model = await prisma.model.create({
      data: {
        name: data.name,
        slug: data.slug,
        category: data.category,
        nationality: data.nationality,
        profileImage: data.profileImage,
        images: data.images || [],
        bio: data.bio,
        height: data.height,
        measurements: data.measurements,
        instagram: data.instagram,
      },
    })

    return NextResponse.json({ data: model }, { status: 201 })
  } catch (error) {
    console.error('모델 생성 오류:', error)
    return NextResponse.json(
      { error: '모델 생성에 실패했습니다' },
      { status: 500 }
    )
  }
}
