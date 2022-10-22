export function timeHasPassed(timestamp) {
    const interval = (Date.now() - timestamp) / 1000;
    const year = Math.round(interval / 60 / 525600);
    const day = Math.round(interval / 60 / 60 / 24);
    const minute = Math.round(interval / 60 % 60);

    const dateYear = new Date(parseInt(timestamp)).getFullYear();
    const dateMonth = new Date(parseInt(timestamp)).getMonth() + 1;
    const dateDay = new Date(parseInt(timestamp)).getDate();
    const dateHours = new Date(parseInt(timestamp)).getHours();
    const dateMinutes = new Date(parseInt(timestamp)).getMinutes();

    switch (true) {
    case (year > 0): {
        return `${dateDay}.${dateMonth}.${dateYear}`;
    }

    case (day >= 1): {
        return `${dateDay}.${dateMonth}`;
    }

    case (minute > 30): {
        return `${dateHours}.${dateMinutes}`;
    }

    case (minute > 10): {
        return "30 минут назад";
    }

    case (minute > 5): {
        return "10 минут назад";
    }

    case (minute > 1): {
        return "5 минут назад";
    }

    default: {
        return "1 минут назад";
    }
    }
}
