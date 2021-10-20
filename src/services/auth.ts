interface Response {
  token: string;
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3RGcm9udEV3YWxseSIsImFjY291bnROYW1lIjoiODQyNTEzMDkwMDAxNDQiLCJzZXNzaW9uSWQiOjE2MzQ3NTkyNzM3MjB9._zF3awzvEXN6wAdZe9IqbKZfCEaS1lvf4oX4y2x9_Us'
      });
    }, 2000);
  });
}
