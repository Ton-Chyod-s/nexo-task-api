
export const authRegisterDoc = {
  '/register': {
    post: {
      tags: ['Auth'],
      summary: 'Register a new user',
      description: 'Endpoint to register a new user in the system.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Name of the user',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Email address of the user',
                },
                password: {
                  type: 'string',
                  description: 'Password for the user account',
                },
              },
              required: ['name', 'email', 'password'],
            },
          },
        },
      },
      responses: {
        201: {
          description: 'User registered successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    example: 'User registered successfully.',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Bad Request - Invalid input data',
        },
        500: {
          description: 'Internal Server Error - Registration failed',
        },
      },
    },
  },
}