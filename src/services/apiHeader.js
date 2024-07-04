export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user && user.data.token) {
        // For Laravel Php back-end
        return { Authorization: "Bearer " + user.data.token };

        // For Node.js Express back-end
        // return { "x-access-token": user.accessToken };
    } else {
        return {};
    }
}
