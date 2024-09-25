import React from 'react';
import { Comment } from '@asfilab/janun-client';
import { Card, CardContent, Typography, Link, Box } from '@mui/material';

interface CommentCardProps {
  comment: Comment;
  username?: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, username }) => {
  const isOwnComment = comment.user?.username === username;

  return (
    <Card
      sx={{
        mb: 2,
        p: 2,
        borderRadius: 2,
        border: `1px solid ${isOwnComment ? 'rgba(0, 0, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
        backgroundColor: isOwnComment ? 'primary' : 'black',
      }}
    >
      <CardContent>
        <Box>
          <Typography variant="body2" color="textSecondary" fontWeight="bold">
            {comment.anonymous ? (
              'Anonymous'
            ) : (
              <Link href={comment.user ? `/user/${comment.user.username}` : undefined} color="primary">
                @{comment.user?.username}
              </Link>
            )}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {comment.createdAgo}
          </Typography>
          <Typography variant="body1" color="textPrimary" mt={1}>
            {comment.content}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
