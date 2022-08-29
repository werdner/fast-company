export function findPerson(users, target) {
    const usersList = [];
    target = target.toLowerCase();

    for (const user of users) {
        if (isMatch(user.name.toLowerCase(), target) === target) {
            usersList.push(user);
        }
    }

    return usersList;
};

function isMatch(user, target) {
    const table = Array.from({ length: user.length + 1 }, () => new Array(target.length + 1).fill(""));
    let maxSub = "";

    for (let row = 1; row < table.length; row++) {
        for (let col = 1; col < table[0].length; col++) {
            if (user[row - 1] === target[col - 1]) {
                table[row][col] = table[row - 1][col - 1] + user[row - 1];

                if (maxSub.length < table[row][col].length) maxSub = table[row][col];
            } else {
                table[row][col] = "";
            }
        }
    }

    return maxSub;
};
