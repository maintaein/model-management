import { GET, PATCH, DELETE } from '@/app/api/models/[id]/route'
import { cleanDatabase, setupTestDatabase, disconnectDatabase, getTestPrisma } from '../setup/testDb'
import { createTestModel, createTestArchive, mockAuthenticatedSession, mockUnauthenticatedSession } from '../setup/testHelpers'
import { NextRequest } from 'next/server'

// NextAuth mock
jest.mock('next-auth', () => ({
  getServerSession: jest.fn(),
}))

// 테스트 서버 래퍼 함수
async function callGET(id: string) {
  const mockRequest = {} as NextRequest
  const mockContext = {
    params: Promise.resolve({ id }),
  }

  return GET(mockRequest, mockContext)
}

async function callPATCH(id: string, body: Record<string, unknown>) {
  const mockRequest = {
    json: async () => body,
  } as NextRequest
  const mockContext = {
    params: Promise.resolve({ id }),
  }

  return PATCH(mockRequest, mockContext)
}

async function callDELETE(id: string) {
  const mockRequest = {} as NextRequest
  const mockContext = {
    params: Promise.resolve({ id }),
  }

  return DELETE(mockRequest, mockContext)
}

describe('GET /api/models/[id]', () => {
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

  it('ID로 모델 상세 정보를 조회한다', async () => {
    // Given: 모델 생성
    const model = await createTestModel({ name: 'Test Model', slug: 'test-model' })

    // When: GET 요청
    const response = await callGET(model.id)
    const data = await response.json()

    // Then: 모델 정보 반환
    expect(response.status).toBe(200)
    expect(data.data).toMatchObject({
      id: model.id,
      name: 'Test Model',
      slug: 'test-model',
    })
    expect(data.data.archives).toEqual([])
  })

  it('ID로 모델과 연관된 아카이브를 함께 조회한다', async () => {
    // Given: 모델과 아카이브 생성
    const model = await createTestModel({ name: 'Test Model', slug: 'test-model' })
    await createTestArchive(model.id, { title: 'Archive 1' })
    await createTestArchive(model.id, { title: 'Archive 2' })

    // When: GET 요청
    const response = await callGET(model.id)
    const data = await response.json()

    // Then: 아카이브 포함하여 반환
    expect(response.status).toBe(200)
    expect(data.data.archives).toHaveLength(2)
    expect(data.data.archives[0].title).toBeDefined()
  })

  it('존재하지 않는 ID로 조회 시 404를 반환한다', async () => {
    // Given: 존재하지 않는 ID
    const nonExistentId = 'non-existent-id'

    // When: GET 요청
    const response = await callGET(nonExistentId)

    // Then: 404 Not Found
    expect(response.status).toBe(404)
    const data = await response.json()
    expect(data.error).toBe('모델을 찾을 수 없습니다')
  })
})

describe('PATCH /api/models/[id]', () => {
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
    // Given: 모델 생성, 인증되지 않은 상태
    const model = await createTestModel()
    mockUnauthenticatedSession()

    // When: PATCH 요청
    const response = await callPATCH(model.id, { name: 'Updated Name' })

    // Then: 401 Unauthorized
    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.error).toBe('인증이 필요합니다')
  })

  it('부분 업데이트로 모델 정보를 수정한다', async () => {
    // Given: 모델 생성, 인증된 상태
    const model = await createTestModel({ name: 'Original Name', bio: 'Original Bio' })
    mockAuthenticatedSession()

    // When: 이름만 수정
    const response = await callPATCH(model.id, { name: 'Updated Name' })

    // Then: 이름만 변경되고 나머지는 유지
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.data.name).toBe('Updated Name')
    expect(data.data.bio).toBe('Original Bio')
  })

  it('slug 수정 시 중복 체크를 수행한다', async () => {
    // Given: 두 개의 모델 생성
    const model1 = await createTestModel({ slug: 'model-1' })
    await createTestModel({ slug: 'model-2' })
    mockAuthenticatedSession()

    // When: model-1의 slug를 model-2로 변경 시도
    const response = await callPATCH(model1.id, { slug: 'model-2' })

    // Then: 409 Conflict
    expect(response.status).toBe(409)
    const data = await response.json()
    expect(data.error).toBe('이미 존재하는 slug입니다')
  })

  it('존재하지 않는 모델 수정 시 404를 반환한다', async () => {
    // Given: 인증된 상태
    mockAuthenticatedSession()
    const nonExistentId = 'non-existent-id'

    // When: 존재하지 않는 모델 수정
    const response = await callPATCH(nonExistentId, { name: 'Updated Name' })

    // Then: 404 Not Found
    expect(response.status).toBe(404)
    const data = await response.json()
    expect(data.error).toBe('모델을 찾을 수 없습니다')
  })

  it('잘못된 데이터 타입으로 수정 시 400 에러를 반환한다', async () => {
    // Given: 모델 생성, 인증된 상태
    const model = await createTestModel()
    mockAuthenticatedSession()

    // When: 잘못된 타입 (height는 number여야 함)
    const response = await callPATCH(model.id, { height: 'not-a-number' })

    // Then: 400 Bad Request
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('입력값이 올바르지 않습니다')
  })
})

describe('DELETE /api/models/[id]', () => {
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
    // Given: 모델 생성, 인증되지 않은 상태
    const model = await createTestModel()
    mockUnauthenticatedSession()

    // When: DELETE 요청
    const response = await callDELETE(model.id)

    // Then: 401 Unauthorized
    expect(response.status).toBe(401)
    const data = await response.json()
    expect(data.error).toBe('인증이 필요합니다')
  })

  it('모델을 삭제한다', async () => {
    // Given: 모델 생성, 인증된 상태
    const model = await createTestModel({ name: 'To Be Deleted' })
    mockAuthenticatedSession()

    // When: DELETE 요청
    const response = await callDELETE(model.id)

    // Then: 삭제 성공
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.message).toBe('모델이 삭제되었습니다')

    // 삭제 확인
    const getResponse = await callGET(model.id)
    expect(getResponse.status).toBe(404)
  })

  it('모델 삭제 시 연관된 아카이브도 함께 삭제한다 (cascade)', async () => {
    // Given: 모델과 아카이브 생성
    const model = await createTestModel()
    const archive = await createTestArchive(model.id)
    mockAuthenticatedSession()

    // When: 모델 삭제
    const response = await callDELETE(model.id)

    // Then: 모델과 아카이브 모두 삭제됨
    expect(response.status).toBe(200)

    // 아카이브도 삭제 확인 (Prisma 쿼리로 직접 확인)
    const deletedArchive = await getTestPrisma().archive.findUnique({
      where: { id: archive.id },
    })
    expect(deletedArchive).toBeNull()
  })

  it('존재하지 않는 모델 삭제 시 404를 반환한다', async () => {
    // Given: 인증된 상태
    mockAuthenticatedSession()
    const nonExistentId = 'non-existent-id'

    // When: 존재하지 않는 모델 삭제
    const response = await callDELETE(nonExistentId)

    // Then: 404 Not Found
    expect(response.status).toBe(404)
    const data = await response.json()
    expect(data.error).toBe('모델을 찾을 수 없습니다')
  })
})
