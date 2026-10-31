import { useMutation, useQueryClient } from '@tanstack/react-query';
import { saveGymTrainerWeb, SaveGymTrainerWebParams } from '@/lib/helpers/trainers/saveGymTrainerWeb';

export function useMutateGymTrainer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SaveGymTrainerWebParams | any) => saveGymTrainerWeb(params),
    onSuccess: (_data, variables: any) => {
      queryClient.invalidateQueries({ queryKey: ['trainers'] });

      if (variables.gymTrainerId) {
        queryClient.invalidateQueries({ queryKey: ['trainer', variables.gymTrainerId] });
      }
    },
  });
}

export function useMutateGymTrainerWeb() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SaveGymTrainerWebParams) => saveGymTrainerWeb(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['trainers'] });

      if (variables.gymTrainerId) {
        queryClient.invalidateQueries({ queryKey: ['trainer', variables.gymTrainerId] });
      }
    },
  });
}
