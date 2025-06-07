/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RegisterInput from './RegisterInput';
import userEvent from '@testing-library/user-event';
describe('RegisterInput component', () => {
  it('should handle name typing correctly', async () => {
    // arrage
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    // action
    await userEvent.type(nameInput, 'nametest');
    // assert
    expect(nameInput).toHaveValue('nametest');
  });
  it('should handle email typing correctly', async () => {
    // arrage
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');
    // action
    await userEvent.type(emailInput, 'emailtest');
    // assert
    expect(emailInput).toHaveValue('emailtest');
  });
  it('should handle password typing correctly', async () => {
    // arrage
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');
    // action
    await userEvent.type(passwordInput, 'passwordtest');
    // assert
    expect(passwordInput).toHaveValue('passwordtest');
  });
  it('should call register function when register button is clicked', async () => {
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'nametest');
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'emailtest');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const registerButton = await screen.getByRole('button', {
      name: 'Register',
    });
    // action
    await userEvent.click(registerButton);
    // assert
    expect(mockRegister).toBeCalledWith({
      name: 'nametest',
      email: 'emailtest',
      password: 'passwordtest',
    });
  });
});
