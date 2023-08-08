import React, { useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/Login.module.css';
import { Avatar, Button, TextField, Typography, Link } from '@mui/material';
import { LockOpen } from '@mui/icons-material';
import { blue } from '@mui/material/colors';

const SignIn = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/registerUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                setName('');
                setEmail('');
                setPassword('');
                console.log('User registered successfully!');
            } else {
                console.error('Failed to register user');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <>
            <Head>
                <title>Signin</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={styles.main}>
                <div className={styles.container}>
                    <Avatar sx={{ bgcolor: blue[500] }}>
                        <LockOpen />
                    </Avatar>
                    <h1>Create a new account</h1>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Button className={styles.btn} fullWidth type="submit" variant="contained">
                            SIGN IN
                        </Button>
                    </form>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, fontSize: 20 }}>
                        {'If you already have an account go to '}
                        <Link color="inherit" href="/backend/login">
                            Login
                        </Link>{' '}
                        {'.'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4, fontSize: 16 }}>
                        {'Copyright © '}
                        <Link color="inherit" href="/frontend">
                            Cyberclothing
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </div>
            </main>
        </>
    );
};

export default SignIn;
