// app/dashboard/tags/page.tsx
'use client';

import { Card, CardContent, CardHeader, Typography } from '@mui/material';

export default function Tags() {
  return (
    <Card>
      <CardHeader title="Tags" />
      <CardContent>
        <Typography>Your tags goes here...</Typography>
      </CardContent>
    </Card>
  );
}