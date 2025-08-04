import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Divider,
  Stack
} from '@mui/material';
import { Business, Chat, Psychology } from '@mui/icons-material';
import { Company } from '../types';

interface CompanyCardProps {
  company: Company;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <Card elevation={2} sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Business color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6" component="h3">
            {company.company}
          </Typography>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {company.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Chatbots Section */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Chat color="secondary" sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="subtitle2">
              Chatbots ({company.chats?.length || 0})
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {company.chats?.length > 0 ? (
              company.chats.map((chat) => (
                <Chip
                  key={chat.id}
                  label={chat.chatbot}
                  size="small"
                  variant="outlined"
                  color="secondary"
                />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No chatbots available
              </Typography>
            )}
          </Stack>
        </Box>

        {/* LLMs Section */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Psychology color="primary" sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="subtitle2">
              LLM Models ({company.llms?.length || 0})
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {company.llms?.length > 0 ? (
              company.llms.map((llm) => (
                <Chip
                  key={llm.id}
                  label={`${llm.llm} (${llm.specialization})`}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No LLM models available
              </Typography>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
