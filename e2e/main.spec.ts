import {expect, test} from '@playwright/test';

test('should allow to navigate to component and back home', async ({page}) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Fantasy Components');
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Beautiful Components For Your Website',
    })
  ).toBeVisible();
  await expect(
    page.getByRole('heading', {
      level: 2,
      name: 'Open source, created with modern tools and optimized for good performance',
    })
  ).toBeVisible();
  await page.getByRole('link', {name: 'View Components'}).click();

  await expect(page).toHaveURL('/components');
  await expect(page).toHaveTitle('Components — Fantasy Components');
  await expect(page.locator('h1')).toHaveText('Components');
  await page
    .getByRole('link', {
      name: 'Exclusion Tabs',
    })
    .click();

  await expect(page).toHaveURL('/components/exclusion-tabs');
  await expect(page).toHaveTitle('Exclusion Tabs — Fantasy Components');
  await expect(
    page.getByRole('heading', {name: 'Exclusion Tabs'})
  ).toBeVisible();
  await expect(
    page.getByText('Tabs with a seamless transition.')
  ).toBeVisible();

  await page
    .getByRole('link', {
      name: 'Home',
    })
    .click();
  await expect(page).toHaveURL('/');
});
