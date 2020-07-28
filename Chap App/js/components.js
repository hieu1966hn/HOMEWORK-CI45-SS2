const components = {}; //// dùng để lưu màn hình giao diện của mình ( màn 1)
components.welcomeScreen = ` 
<h1>Welcome to Chat app</h1>
`; // welcomescreen : thêm thuộc tính vào object (components).
components.registerScreen = `
<div class="register-container">
        <div class="aside-right">
            <div class="header">
                <h3>MindX Chat</h3>
            </div>

            <form id="register-form">
                <div class="input-name-wrapper">
                    <div class="input-wrapper">
                        <input type="text" name="firstName" placeholder="First-name..">
                        <div class="error" id="first-name-error"></div>
                    </div>
                    <div class="input-wrapper">
                        <input type="text" name="lastName" placeholder="Last-name..">
                        <div class="error" id="last-name-error"></div>
                    </div>
                </div>
                <div class="input-wrapper">
                    <input type="text" name="email" placeholder="Email..">
                    <div class="error" id="email-error"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" name="password" placeholder="Password..">
                    <div class="error" id="password-error"></div>
                </div>
                <div class="input-wrapper">
                    <input type="password" name="confirmPassword" placeholder="Confirm password...">
                    <div class="error" id="confirm-password-error"></div>
                </div>
                <div class="form-action">
                    <span class = "cursor" id="redirect-to-login">
                        Already have an account? Login
                    </span>
                    <button class="btn" type="submit">
                        Register
                    </button>
                </div>
            </form>
        </div>
    </div>`;
///// loginScreen
components.loginScreen = `
<div class="login-container">
<div class="aside-right">
    <div class="header">
        <h3>MindX Chat</h3>
    </div>
    
    <form id="login-form">
        <div class="input-wrapper">
            <input type="text" name="email" placeholder="Email..">
            <div class="error" id="email-error"></div>
        </div>
        <div class="input-wrapper">
            <input type="password" name="password" placeholder="Password..">
            <div class="error" id="password-error"></div>
        </div>

        <div class="form-action">
            <span class = "cursor" id="redirect-to-register">
                Don't have an account? Register
            </span>
            <button id = "redirect-to-chatScreen" class="btn" type="submit">
                Login
            </button>
        </div>
    </form>
</div>
</div>

`;

components.chatScreen = `
<div class="chat-container">
        <div class="chat-header">
            <h1 id = "welcome-user"> em vẫn đang bị lỗi phần này => Chưa đổi được nội dung</h1>
        </div>
    </div>
`;
