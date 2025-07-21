import { Test, TestingModule } from '@nestjs/testing';
import { TestQuestion } from './test_question';

describe('TestQuestion', () => {
  let provider: TestQuestion;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestQuestion],
    }).compile();

    provider = module.get<TestQuestion>(TestQuestion);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
