---
layout: page
title: Authentication, Authorization, and Sessions
---

In web development, especially when building applications, it’s essential to understand two key concepts: **authentication** and **authorization**. Both play vital roles in controlling access to resources, ensuring security, and maintaining a smooth user experience.

## Who Are You?

**Authentication** is the process of verifying the identity of a user. It's about confirming who the user claims to be. When you log into an application with a username and password, the app checks that your credentials match its records. If they do, you're **authenticated**.

Examples of authentication methods:
- **Username and password**: The most common method.
- **Multi-factor authentication (MFA)**: Requires two or more verification methods (e.g., password + a code sent to your phone).
- **OAuth**: Login through third-party providers like Google or GitHub.

Authentication asks, "Who are you?" and verifies your identity.

## What Are You Allowed to Do?

**Authorization** happens after authentication. It controls what resources or actions an authenticated user can access. Just because you're logged in doesn't mean you have free rein to do anything in the system.

Examples of authorization:
- A regular user can view their account details, but only an admin can delete user accounts.
- An editor can update articles on a blog, but only the author can delete their own posts.

Authorization asks, "What are you allowed to do?" It ensures users only access the resources they are permitted to.

## **The Role of Sessions in Maintaining User State**

The web operates over **HTTP**, a protocol that is *stateless*. This means that after each request and response, the connection between the client (user's browser) and the server is dropped. The server forgets who the client is after the request completes. But for things like logging in and staying logged in across different pages, we need a way to maintain a **user's state**.

That's where **sessions** come in.

#### How sessions work:
- When a user logs in (authentication), the server creates a **session**.
- The session typically stores the user's ID and any other information needed to identify them.
- The session ID is stored in a cookie on the user's browser.
- For each new request, the browser sends this cookie back to the server, allowing the server to remember the user’s session.

This mechanism helps the server keep track of who the user is across multiple requests. Instead of asking for a password every time you visit a new page, the session keeps track of your identity. **This is how HTTP becomes "stateful"** for a logged-in user.

##### Why sessions matter:
- They help maintain the user’s state across requests.
- They prevent the user from re-authenticating on every page.
- They enable the application to manage access, based on whether the user is logged in or has special permissions.

---

## **Putting it all Together**

Here’s a simple flow of how these concepts work in a typical web application:

1. **User logs in**: The server authenticates the user by checking their credentials (authentication). If successful, it creates a session.
2. **Session is created**: The server stores information about the user (such as their user ID) in the session. The session ID is stored in a cookie and sent to the browser.
3. **User navigates the site**: Each time the user visits a new page, the browser sends the session cookie. The server uses the session information to remember the user.
4. **Authorization is checked**: The server verifies if the user has permission to access the requested resource (authorization). If authorized, the user can proceed.
5. **Session expires or user logs out**: When the session ends, the user must re-authenticate to continue accessing protected resources.



## **TL;DR**

- **Authentication** confirms who a user is.
- **Authorization** controls what a user can do.
- **Sessions** help web applications remember who the user is across multiple HTTP requests, making the experience seamless.