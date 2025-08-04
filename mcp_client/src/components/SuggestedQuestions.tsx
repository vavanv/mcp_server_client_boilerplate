import { Paper, Typography, Chip, Stack } from "@mui/material";

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
  show?: boolean;
  title?: string;
  elevation?: number;
  sx?: object;
}

const SuggestedQuestions = ({
  questions,
  onQuestionClick,
  show = true,
  title = "Try asking:",
  elevation = 1,
  sx = { p: 2, mb: 2 },
}: SuggestedQuestionsProps) => {
  if (!show || questions.length === 0) return null;

  return (
    <Paper elevation={elevation} sx={sx}>
      <Typography variant="subtitle2" gutterBottom>
        {title}
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {questions.map((question, index) => (
          <Chip
            key={index}
            label={question}
            variant="outlined"
            clickable
            onClick={() => onQuestionClick(question)}
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default SuggestedQuestions;
