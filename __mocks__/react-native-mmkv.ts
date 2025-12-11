const mockMMKVInstance = {
  set: jest.fn(),
  getString: jest.fn((key: string) => undefined),
  getBoolean: jest.fn((key: string) => false),
  getNumber: jest.fn((key: string) => 0),
  getObject: jest.fn((key: string) => undefined),
  contains: jest.fn(() => false),
  remove: jest.fn(),
  delete: jest.fn(),
  clearAll: jest.fn(),
  getAllKeys: jest.fn(() => []),
  recrypt: jest.fn(),
};

export const MMKV = jest.fn(() => mockMMKVInstance);

export const createMMKV = jest.fn(() => mockMMKVInstance);

// For backward compatibility
export const create = createMMKV;
