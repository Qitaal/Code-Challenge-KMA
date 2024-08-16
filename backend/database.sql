CREATE DATABASE kma_code_challenge;

\c kma_code_challenge;

CREATE TABLE "user" (
    username VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    password VARCHAR(255)
);