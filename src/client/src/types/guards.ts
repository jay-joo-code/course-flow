import { IRequirement } from '.'

export function isRequirement(obj: any): obj is IRequirement {
  return !obj.isPlaceholder
}
