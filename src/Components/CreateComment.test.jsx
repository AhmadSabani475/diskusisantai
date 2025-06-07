/**
 * skenario testing
 *
 * - CreateComment component
 *   - should handle What's Your Comment typing correctly
 *   - should call sendComment function when button is clicked
 */

import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CreateComment from './CreateComment';
import userEvent from '@testing-library/user-event';
describe('CreateComment Components', () => {
  it("should handle What's Your Comment typing correctly", async () => {
    // arrage
    render(<CreateComment sendComment={() => {}} />);
    const commentInput = await screen.getByPlaceholderText(
      "What's Your Comment"
    );
    // action
    await userEvent.type(commentInput, 'commenttest');
    // assert
    expect(commentInput).toHaveValue('commenttest');
  });
  it('should call sendComment function when button is clicked', async () => {
    // arrage
    const mockSendComment = vi.fn();
    render(<CreateComment sendComment={mockSendComment} />);
    const commentInput = await screen.getByPlaceholderText(
      "What's Your Comment"
    );
    await userEvent.type(commentInput, 'commenttest');
    const sendComment = await screen.getByRole('button', { name: 'Send' });
    // action
    await userEvent.click(sendComment);
    // assert
    expect(mockSendComment).toHaveBeenCalledWith('commenttest');
  });
});
