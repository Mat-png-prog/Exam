import argon2 from '@node-rs/argon2';

async function hashPassword(password) {
  try {
    const hash = await argon2.hash(password);
    console.log('Hashed password:', hash);
  } catch (err) {
    console.error('Error hashing password:', err);
  }
}

// Replace 'Enter password here' with the actual password you want to hash
hashPassword('Enter password here');


/* // hashPassword.mjs
import bcrypt from 'bcrypt';

async function hashPassword(password) {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Hashed password with bcrypt:', hash);
  } catch (err) {
    console.error('Error hashing password with bcrypt:', err);
  }
}

hashPassword('Enter password here');
 */

/* // hashPassword.mjs
import { scryptSync, randomBytes } from 'crypto';

function hashPassword(password) {
  try {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    console.log(`Hashed password with scrypt: ${salt}:${hash}`);
  } catch (err) {
    console.error('Error hashing password with scrypt:', err);
  }
}

hashPassword('Enter password here'); */

/* // hashPassword.mjs
import { pbkdf2Sync, randomBytes } from 'crypto';

function hashPassword(password) {
  try {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    console.log(`Hashed password with pbkdf2: ${salt}:${hash}`);
  } catch (err) {
    console.error('Error hashing password with pbkdf2:', err);
  }
}

hashPassword('Enter password here'); */

/* import React, { useState } from 'react';
import bcrypt from 'bcrypt';

const NumberForm: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumber(value);

    // Clear error if input is within valid length
    if (value.length >= 10 && value.length <= 15) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (number.length < 10 || number.length > 15) {
      setError('Phone number must be between 10 and 15 digits long');
    } else {
      setError(null);
      try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash('Mat@0987', saltRounds);
        console.log('Hashed password:', hashedPassword);
        // Perform further actions with the valid phone number and hashed password
      } catch (err) {
        console.error('Error hashing password:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter a phone number:
        <input
          type="number"
          value={number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default NumberForm;
 */