/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { RepositoryList } from '../RepositoryList';
import { Repository } from '@/types';

const getMockedRepositories = (): Repository[] => {
  return [
    {
      id: 1,
      name: 'mocked-repo-1',
      html_url: 'https://github.com/user/mocked-repo-1',
      description: 'Test repository mocked on app-github-finder',
      stargazers_count: 10,
      watchers_count: 5,
    },
    {
      id: 2,
      name: 'app-github-finder',
      html_url: 'https://github.com/user/app-github-finder',
      description: 'A simple project containing a README.',
      stargazers_count: 50,
      watchers_count: 0,
    },
    {
      id: 3,
      name: 'most-starred-repo-ever',
      html_url: 'https://github.com/user/most-starred-repo-ever',
      description: 'This project is awesome.',
      stargazers_count: 1048420,
      watchers_count: 5,
    },
  ];
};

jest.mock('../RepositoryItem', () => ({
  RepositoryItem: ({ name }: { name: string }) => (
    <div data-testid='repository-item'>{name}</div>
  ),
}));

describe('RepositoryList', () => {
  it('should render repository items in default sort order (stars desc)', () => {
    const mockRepositories = getMockedRepositories();
    render(<RepositoryList repositories={mockRepositories} />);

    // List is correcly rendered
    const list = screen.getByRole('list', {
      name: 'Repositories list',
    });
    expect(list).toBeInTheDocument();

    // Get all repository items
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);

    // Validate the order is correct
    expect(items[0]).toHaveTextContent('most-starred-repo-ever');
    expect(items[0]).toHaveAttribute('aria-label', 'most-starred-repo-ever');

    expect(items[1]).toHaveTextContent('app-github-finder');
    expect(items[1]).toHaveAttribute('aria-label', 'app-github-finder');

    expect(items[2]).toHaveTextContent('mocked-repo-1');
    expect(items[2]).toHaveAttribute('aria-label', 'mocked-repo-1');
  });

  it('should sort repositories by name asc when ascending sort is selected', () => {
    const mockRepositories = getMockedRepositories();
    render(<RepositoryList repositories={mockRepositories} />);

    const sortFieldSelect = screen.getByLabelText('Sort by field');
    fireEvent.change(sortFieldSelect, { target: { value: 'name' } });

    const sortOrderSelect = screen.getByLabelText('Sort order');
    fireEvent.change(sortOrderSelect, { target: { value: 'asc' } });

    const repositoryItems = screen.getAllByTestId('repository-item');
    expect(repositoryItems[0]).toHaveTextContent('app-github-finder');
    expect(repositoryItems[1]).toHaveTextContent('mocked-repo-1');
    expect(repositoryItems[2]).toHaveTextContent('most-starred-repo-ever');
  });
});
