// Jest 전역 설정
import { config } from 'dotenv'

// 테스트 환경 변수 로드
config({ path: '.env.test' })

// 테스트 타임아웃 설정 (10초)
jest.setTimeout(10000)

// 전역 모킹 설정 (필요 시)
// console 출력 억제 (선택사항)
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
// }
