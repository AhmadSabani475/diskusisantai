/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import LoginInput from './LoginInput';
import userEvent from '@testing-library/user-event';

describe('LoginInput component', () => {
  it('should handle email typing correctly', async () => {
    // arrage
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('email');
    // action
    await userEvent.type(emailInput, 'emailtest');
    // assert
    expect(emailInput).toHaveValue('emailtest');
  });
  it('should handle password typing correctly', async () => {
    // arrage
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');
    // action
    await userEvent.type(passwordInput, 'passwordTest');
    // assert
    expect(passwordInput).toHaveValue('passwordTest');
  });
  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText('email');
    await userEvent.type(emailInput, 'emailtest');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name: 'Log In' });
    // action
    await userEvent.click(loginButton);
    // assert
    expect(mockLogin).toBeCalledWith({
      email: 'emailtest',
      password: 'passwordtest',
    });
  });
});
