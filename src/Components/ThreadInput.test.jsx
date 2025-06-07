/**
 * skenario testing
 *
 * - ThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call createThread function when button is clicked
 */

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ThreadInput from './ThreadInput';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
describe('ThreadInput component', () => {
  it('should handle title typing correctly', async () => {
    // arrage
    render(<ThreadInput createThread={() => {}} />);
    const titleInput = await screen.getByPlaceholderText('Title');
    // action
    await userEvent.type(titleInput, 'threadtest');
    // assert
    expect(titleInput).toHaveValue('threadtest');
  });
  it('should handle category typing correctly', async () => {
    // arrage
    render(<ThreadInput createThread={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText('Category');
    // action
    await userEvent.type(categoryInput, 'categorytest');
    // assert
    expect(categoryInput).toHaveValue('categorytest');
  });
  it('should handle body typing correctly', async () => {
    // arrage
    render(<ThreadInput createThread={() => {}} />);
    const bodyInput = await screen.getByPlaceholderText("What's New ?");
    // action
    await userEvent.type(bodyInput, 'bodytest');
    // assert
    expect(bodyInput).toHaveValue('bodytest');
  });
  it('should call createThread function when button is clicked', async () => {
    const mockCreatedThread = vi.fn();
    render(<ThreadInput createThread={mockCreatedThread} />);
    const titleInput = await screen.getByPlaceholderText('Title');
    await userEvent.type(titleInput, 'titletest');
    const categoryInput = await screen.getByPlaceholderText('Category');
    await userEvent.type(categoryInput, 'categorytest');
    const bodyInput = await screen.getByPlaceholderText("What's New ?");
    await userEvent.type(bodyInput, 'bodytest');
    const createThread = await screen.getByRole('button', {
      name: 'Create Thread',
    });
    // action
    await userEvent.click(createThread);
    // assert
    expect(mockCreatedThread).toHaveBeenCalledWith({
      title: 'titletest',
      category: 'categorytest',
      body: 'bodytest',
    });
  });
});
