import { IPlanDoc } from 'src/types/plan'
import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'

export const fetchPlanByIdConfig = (psid) => ({
  url: `/public/plan/${psid}`,
  options: {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  }
})

export const usePlanById = (psid) => {
  const { data: plan, ...rest } = useCustomQuery<IPlanDoc>(fetchPlanByIdConfig(psid))
  return {
    ...rest,
    plan,
  }
}

export const useGeneratePlanByMajor = () => {
  const { mutateAsync: generatePlan, ...rest } = useCustomMutation<IPlanDoc>({
    url: '/public/plan/major',
    method: 'post',
  })
  return {
    ...rest,
    generatePlan,
  }
}

export const useUpdatePlanById = (psid: string | null) => {
  const { mutateAsync: updatePlan, ...rest } = useCustomMutation<IPlanDoc>({
    url: `/public/plan/${psid}`,
    method: 'put',
    updateLocal: {
      queryConfigs: [fetchPlanByIdConfig(psid)],
      mutationFn: (old, newVariables) => {
        return {
          ...old,
          ...newVariables,
        }
      },
      isNotRefetchOnSettle: true,
    },
  })
  return {
    ...rest,
    updatePlan,
  }
}

// export const useDeleteListingById = (_id: string) => {
//   const { mutate: deleteListing, ...rest } = useCustomMutation<ListingDoc>({
//     url: `/private/task/${_id}`,
//     method: 'delete',
//     updateLocal: {
//       queryConfigs: [fetchMyListingsConfig()],
//       type: 'delete',
//     },
//   })
//   return {
//     ...rest,
//     deleteListing,
//   }
// }
