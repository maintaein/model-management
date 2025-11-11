// Jest 전역 설정
import { config } from 'dotenv'

// 테스트 환경 변수 로드
config({ path: '.env.test' })

// 테스트 타임아웃은 jest.config.ts에서 설정 (30초)
// jest.setTimeout()을 여기서 호출하면 jest.config.ts의 testTimeout을 덮어씁니다

// 전역 모킹 설정 (필요 시)
// console 출력 억제 (선택사항)
// global.console = {
//   ...console,
//   log: jest.fn(),
//   debug: jest.fn(),
//   info: jest.fn(),
// }
