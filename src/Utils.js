export const CDN_URL = 'https://d2s2wlfnj4s3ni.cloudfront.net';

export const API_URL = 'http://localhost:8000';

export const getName = (fullName) => {
    const names = fullName.split(',');
    return ({
        firstName : names[1].substring(1),
        lastName : names[0]
    });
};

export const getPercentage = (n1, n2) => n1 / parseFloat(n2);

export const getTeamPlayed = (home, away, playerTeam) => playerTeam === home ? away : home;