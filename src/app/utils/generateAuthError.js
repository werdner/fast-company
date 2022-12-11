export function generateAuthError(message) {
    switch (message) {
    case "EMAIL_EXISTS": {
        return "Пользователь с таким email уже существует";
    }
    case "INVALID_PASSWORD": {
        return "Неверный пароль";
    }
    default:
        return "Слишком много попыток входа";
    }
}
