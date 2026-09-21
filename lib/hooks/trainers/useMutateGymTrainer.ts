import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveGymTrainer, SaveGymTrainerParams } from '@/lib/helpers/trainers/trainerHelper';

export function useMutateGymTrainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SaveGymTrainerParams) => saveGymTrainer(params),
    onSuccess: (data, variables) => {
      // Invalidate both trainers lists
      queryClient.invalidateQueries({ queryKey: ['trainers'] });
      
      // If updating an existing trainer, invalidate that specific query
      if (variables.gymTrainerId) {
        queryClient.invalidateQueries({ queryKey: ['trainer', variables.gymTrainerId] });
      }
    },
  });
}
