export const fakeAuth = ({ email, password }) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (email === "hamza" && password === "hamza") {
        resolve({
          success: true,
          user: {
            token: "222",
            id: 1,
            name: "John Doe",
            email: "user@example.com",
          },
        });
      } else {
        resolve({
          success: false,
          error: "Invalid email or password.",
        });
      }
    });
  }, 1000);

export const fakeTokenVerify = (token) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (token == "222") {
        resolve({
          success: true,
          user: {
            name: "John Doe",
            email: "user@example.com",
          },
        });
      } else {
        resolve({
          success: false,
          error: "Invalid Token",
        });
      }
    });
  });

export const fakeBooks = (token) =>
  new Promise((resolve) => {
    setTimeout(async () => {
      const response = await fakeTokenVerify(token);
      if (!response.success) return resolve(response);
      try {
        let data = await fetch("/bookss.json");
        data = await data.json();
        resolve({ success: true, books: data, length: 50 });
      } catch (e) {
        resolve({ success: false, error: e });
      }
    });
  });

export const fakeBookBorrow = (token) =>
  new Promise((resolve) => {
    setTimeout(async () => {
      const response = await fakeTokenVerify(token);
      if (!response.success) return resolve({ response });
      try {
        resolve({
          success: false,
          message: "the book has been borrosed sucessfully",
        });
      } catch (e) {
        resolve({ success: false, error: e });
      }
    });
  });
