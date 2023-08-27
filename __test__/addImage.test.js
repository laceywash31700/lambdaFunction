const { GetObjectCommand, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { addImage } = require('../index.js');
const mockS3Client = require('@aws-sdk/client-s3-node');

jest.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: mockS3Client,
    GetObjectCommand,
    PutObjectCommand,
    DeleteObjectCommand,
  };
});

describe('addImage Lambda', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add an image', async () => {
    // Mock GetObjectCommand response
    const mockGetObject = jest.fn();
    mockGetObject.mockReturnValue({
      Body: {
        toString: () => JSON.stringify([]),
      },
    });
    mockS3Client.prototype.send = mockGetObject;

    const event = {
      Records: [
        {
          s3: {
            object: {
              key: 'image.jpg',
              size: 1000,
            },
          },
        },
      ],
    };

    // Call your function
    const result = await addImage(event);
  });
});
