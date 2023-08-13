// Copyright 2022 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { Button } from '../common/Button';

export function HelpBox(): React.ReactElement | null {
  return (
    <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
      <div className="relative border p-4 dark:bg-elevation-1 dark:border-gray-800 border-gray-200 rounded w-auto">
        <div className="text-sm font-semibold text-blue-500 pb-1">
          Try out Selendra Web Contract
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 pb-2">
          To learn more about Selendra Network or have any questions.
        </div>
        <div>
          <a href="https://t.me/selendrachain" target="_blank" rel="noreferrer">
            <Button className="border-2 py-1.5 px-3" variant="default">
              Join Telegram
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
