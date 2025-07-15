# Auth & Profile Management Frontend

This is a React (Vite) frontend application implementing user authentication, password reset, and profile management features using **Formik**, **Yup**, and **Axios**. It is built for integration with a Node.js backend running on `http://localhost:5000`.

>  This frontend **requires the backend to be running**. The backend is developed in a **separate repository**:
>
>  **Backend Repository:** https://github.com/ghania-03/auth-backend.git

## How to Run the Project

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ghania-03/auth-frontend.git
2. **Navigate to the project directory:**

    ```bash
    cd frontend-auth-app
3. **Install dependencies:**

    ```bash
    npm install
4. **Run the development server:**

    ```bash
    npm run dev
5. **Make sure the backend is running at:**

    ```arduino
    http://localhost:5000
# Node.js Version Required
  Node.js v18.0.0 or higher
# Completed Features

## `SignupPage.jsx`
- Full-featured form using **Formik** and **Yup**.
- Validation for:
  - Name
  - Email
  - Password strength
  - Date of Birth
  - Gender
  - Phone number
- Upload support for profile and cover images.
- **POST**: `/api/auth/signup`

---

## `LoginPage.jsx`
- Email/password login with validation.
- "Remember Me" functionality using `localStorage` and `sessionStorage`.
- Includes a "Forgot Password?" link that navigates to the password reset flow.
- Redirects to Profile page on successful login.
- **POST**: `/api/auth/login`

---

## `ForgotPasswordPage.jsx`
- Form to request password reset via email.
- Sends OTP request to backend.
- Navigates to Verify OTP page on submit.
- **POST**: `/api/auth/forgot-password`

---

## `VerifyOtpPage.jsx`
- Input and verify a 6-digit OTP.
- On success, navigates to Reset Password page.
- **POST**: `/api/auth/verify-otp`

---

## `ResetPasswordPage.jsx`
- Enter new password and confirm password.
- Strong password validation.
- **POST**: `/api/auth/reset-password`

---

## `ProfilePage.jsx`

Displays:
- Full Name  
- Username  
- Email  
- Phone  
- Gender  
- Date of Birth  
- Profile and Cover image preview  

Includes embedded forms to edit personal information and password.

---

# Embedded Components

## `EditUsernameForm.jsx`
- Update username  
- **PATCH**: `/api/user/update-username`

## `ChangePassword.jsx`
- Change current password to new password  
- **PATCH**: `/api/user/change-password`

## `EditProfileForm.jsx`
- Edit phone number, gender, and date of birth  
- **PUT**: `/api/user/update-profile`

## `UpdateImagesForm.jsx`
- Upload/update profile and cover images  
- **PATCH**: `/api/user/images`

---
# Incomplete Tasks
- All intended tasks and features have been completed successfully. No pending tasks at this time.
  
# Known Bugs
All known bugs have been handled during development. As of now, no bugs are known to exist.

---
### AI-Written Code: ~30%
The AI assisted in:

- Suggesting **UI layout improvements**
- Drafting and organizing this **documentation**
- Improving some **reusable components** and **styling patterns**

### Developer-Written Code: ~70%
The developer was responsible for:

- Core feature **implementation**
- **Component development** and **UI creation**
- Manual **API integration** and **logic handling**
- Building full **authentication flow**
- Conducting all **final testing** and **debugging**

# Final Notes

- This frontend is designed to work with a separate backend (`/api/*` endpoints).
- This frontend does **not use a .env file**, as all API endpoints are directly referenced.
- All features and components are tested and confirmed working.

# Author

Made with effort by **Ghania Iman**  
GitHub: [@ghania-03](https://github.com/ghania-03)
