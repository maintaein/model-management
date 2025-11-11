import { GET, POST } from '@/app/api/models/route'
import { cleanDatabase, setupTestDatabase, disconnectDatabase } from '../setup/testDb'
import { createTestModel, mockAuthenticatedSession, mockUnauthenticatedSession } from '../setup/testHelpers'
import { NextRequest } from 'next/server'

// NextAuth mock
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}))

// 테스트 서버 래퍼 함수
async function callGET(query: Record<string, string> = {}) {
  const url = new URL('http://localhost:3000/api/models')
  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  const mockRequest = {
    url: url.toString(),
  } as NextRequest

  return GET(mockRequest)
}

async function callPOST(body: Record<string, unknown>) {
  const mockRequest = {
    json: async () => body,
  } as NextRequest

  return POST(mockRequest)
}

describe('GET /api/models', () => {
  beforeAll(async () => {
    await setupTestDatabase()
  })

  beforeEach(async () => {
    await cleanDatabase()
  })

  afterAll(async () => {
    await cleanDatabase()
    await disconnectDatabase()
  })

  it('기본 페이지네이션으로 모델 목록을 조회한다', async () => {
    // Given: 3개의 모델 생성
    await createTestModel({ name: 'Model 1', slug: 'model-1' })
    await createTestModel({ name: 'Model 2', slug: 'model-2' })
    await createTestModel({ name: 'Model 3', slug: 'model-3' })

    // When: GET 요청
    const response = await callGET()
    const data = await response.json()

    // Then: 응답 검증
    expect(response.status).toBe(200)
    expect(data.data).toHaveLength(3)
    expect(data.pagination).toEqual({
      total: 3,
      page: 1,
      limit: 10,
      totalPages: 1,
    })
  })

  it('카테고리로 필터링하여 모델을 조회한다', async () => {
    // Given: 다양한 카테고리의 모델 생성
    await createTestModel({ name: 'Model 1', slug: 'model-1', category: 'INTOWN' })
    await createTestModel({ name: 'Model 2', slug: 'model-2', category: 'UPCOMING' })
    await createTestModel({ name: 'Model 3', slug: 'model-3', category: 'INTOWN' })

    // When: INTOWN 카테고리 필터링
    const response = await callGET({ category: 'INTOWN' })
    const data = await response.json()

    // Then: INTOWN 모델만 조회됨
    expect(response.status).toBe(200)
    expect(data.data).toHaveLength(2)
    expect(data.data[0].category).toBe('INTOWN')
    expect(data.data[1].category).toBe('INTOWN')
  })

  it('페이지네이션 파라미터로 결과를 제한한다', async () => {
    // Given: 15개의 모델 생성
    for (let i = 1; i <= 15; i++) {
      await createTestModel({ name: `Model ${i}`, slug: `model-${i}` })
    }

    // When: 2페이지, limit 5로 요청
    const response = await callGET({ page: '2', limit: '5' })
    const data = await response.json()

    // Then: 5개만 조회되고 페이지 정보 정확함
    expect(response.status).toBe(200)
    expect(data.data).toHaveLength(5)
    expect(data.pagination).toEqual({
      total: 15,
      page: 2,
      limit: 5,
      totalPages: 3,
    })
  })

  it('빈 결과를 정상적으로 처리한다', async () => {
    // Given: 모델 없음

    // When: GET 요청
    const response = await callGET()
    const data = await response.json()

    // Then: 빈 배열 반환
    expect(response.status).toBe(200)
    expect(data.data).toEqual([])
    expect(data.pagination.total).toBe(0)
  })
})

describe('POST /api/models', () => {
  beforeAll(async () => {
    await setupTestDatabase()
  })

  beforeEach(async () => {
    await cleanDatabase()
  })

  afterAll(async () => {
    await cleanDatabase()
    await disconnectDatabase()
  })

  it('인증 없이 요청하면 401 에러를 반환한다', async () => {
    // Given: 인증되지 않은 상태
    mockUnauthenticatedSession()

    // When: POST 요청
    const response = await callPOST({
      name: 'New Model',
      slug: 'new-model',
      category: 'ALL',
      nationality: 'Korea',
      profileImage: 'https://example.com/profile.jpg',
    })

    // Then: 401 Unauthorized
    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.error).toBe('인증이 필요합니다')
  })

  it('유효한 데이터로 모델을 생성한다', async () => {
    // Given: 인증된 상태
    mockAuthenticatedSession()

    const modelData = {
      name: 'New Model',
      slug: 'new-model',
      category: 'ALL',
      nationality: 'Korea',
      profileImage: 'https://example.com/profile.jpg',
      images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
      bio: 'Test bio',
      height: 175,
      measurements: '34-24-36',
      instagram: '@newmodel',
    }

    // When: POST 요청
    const response = await callPOST(modelData)

    // Then: 201 Created
    expect(response.status).toBe(201)
    const data = await response.json()
    expect(data.data).toMatchObject({
      name: 'New Model',
      slug: 'new-model',
      category: 'ALL',
      nationality: 'Korea',
    })
    expect(data.data.id).toBeDefined()
  })

  it('필수 필드 누락 시 400 에러를 반환한다', async () => {
    // Given: 인증된 상태
    mockAuthenticatedSession()

    // When: 필수 필드 누락
    const response = await callPOST({
      name: 'New Model',
      // slug 누락
      category: 'ALL',
    })

    // Then: 400 Bad Request
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('입력값이 올바르지 않습니다')
    expect(data.details).toBeDefined()
  })

  it('중복된 slug로 생성 시 409 에러를 반환한다', async () => {
    // Given: 기존 모델 생성
    await createTestModel({ slug: 'duplicate-slug' })
    mockAuthenticatedSession()

    // When: 동일한 slug로 생성 시도
    const response = await callPOST({
      name: 'Another Model',
      slug: 'duplicate-slug',
      category: 'ALL',
      nationality: 'Korea',
      profileImage: 'https://example.com/profile.jpg',
    })

    // Then: 409 Conflict
    expect(response.status).toBe(409)
    const data = await response.json()
    expect(data.error).toBe('이미 존재하는 slug입니다')
  })

  it('선택적 필드 없이도 모델을 생성한다', async () => {
    // Given: 인증된 상태
    mockAuthenticatedSession()

    const modelData = {
      name: 'Minimal Model',
      slug: 'minimal-model',
      category: 'ALL',
      nationality: 'Korea',
      profileImage: 'https://example.com/profile.jpg',
    }

    // When: 필수 필드만으로 POST 요청
    const response = await callPOST(modelData)

    // Then: 201 Created
    expect(response.status).toBe(201)
    const data = await response.json()
    expect(data.data).toMatchObject(modelData)
    expect(data.data.bio).toBeNull()
    expect(data.data.height).toBeNull()
  })
})
