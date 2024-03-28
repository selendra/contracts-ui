// Copyright 2022-2024 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

interface Window {
  injectedWeb3: any;
}

describe('Signer extension flow on live networks', () => {
  before(() => {
    cy.visit(`/instantiate/?rpc=rpc=wss://rpc1.selendra.org`);
  });

  it('connects to Selendra', () => {
    cy.contains('Connecting to rpc=wss://rpc1.selendra.org').should('not.exist', {
      timeout: 25000,
    });
  });

  it('Displays help text for no extension installed', () => {
    cy.get('[data-cy="error-card"]').within(() => {
      cy.contains('No signer extension found.').should('be.visible');
      cy.contains('New to Substrate?').should('be.visible');
      cy.contains(
        'Install the a compatible wallet like Polkadot.js Extension to create and manage Substrate accounts.',
      ).should('be.visible');
      cy.contains(
        'If the extension is installed and you are seeing this, make sure it allows Contracts UI to use your accounts for signing.',
      ).should('be.visible');
    });
  });
  it('Displays help text for no accounts found', () => {
    cy.visit('/').then(window => {
      window.injectedWeb3 = {
        'polkadot-js': {
          version: '123',
          enable: () => Promise.resolve({ accounts: [] }),
        },
      };
    });
    cy.get('[data-cy="error-card"]').within(() => {
      cy.contains('No accounts found.').should('be.visible');
      cy.contains(
        '1. Follow this guide to create your first account in the Polkadot.js extension.',
      ).should('be.visible');
      cy.contains(
        '2. Drip some funds into your account via the faucets of our supported networks.',
      ).should('be.visible');
    });
  });
});
