import axios from "axios";

export const fakeAuth = ({ username, password }) =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (username == "test" && password == "test1234") {
        resolve({
          success: true,
          user: {
            token: "708401a1a0d854d97ec26189a9d8a4016e0e0117",
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
      if (token == "708401a1a0d854d97ec26189a9d8a4016e0e0117") {
        resolve({
          success: true,
          user: {
            name: "Admin admin",
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
