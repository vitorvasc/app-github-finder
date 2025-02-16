import { NextResponse } from 'next/server';

const buildHeaders = () => {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  };
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  try {
    const headers = buildHeaders();
    const response = await fetch(
      `https://api.github.com/users/${username}`,
      {
        headers,
      }
    );

    if (!response.ok) {
      let errorMessage: string;

      switch (response.status) {
        case 403:
          errorMessage = 'API rate limit exceeded. Please, try again later.';
          break;
        case 404:
          errorMessage = 'User not found.';
          break;
        default:
          errorMessage = 'Failed to fetch user data.';
          break;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : 'Failed to fetch user data.',
      },
      { status: 500 }
    );
  }
}
