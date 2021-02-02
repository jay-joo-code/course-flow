import { IRequirement } from './requirement'

export function isRequirement(obj: any): obj is IRequirement {
  return !obj.isPlaceholder
}
