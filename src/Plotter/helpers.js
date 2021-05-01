import DraggableItem from "../plumbing/components/DraggableItem";

export const filterSelected = ({ isSelected }) => isSelected

export const filterNotSelected = ({ isSelected }) => !isSelected

export function mapToDraggableItem(dataList, itemProps) {
  if (!Array.isArray(dataList)) {
    return null
  }

  return dataList.map((itm) => (
    <DraggableItem
      {...itemProps}
      id={itm.id}
      key={itm.id}
      index={itm.index}
      draggableId={itm.id}
      isSelected={itm.isSelected}
    >
      {itm.name}
    </DraggableItem>
  ))
}

export function toggleSelected(results, opt) {
  return (itm) => {
    const isPlotDest = !!results?.destination?.droppableId?.match?.(/-plot/)

    if (itm.id === results.draggableId) {
      return {
        ...itm,
        isSelected: isPlotDest
      }
    } else if (opt?.clear && isPlotDest) {
      return {
        ...itm,
        isSelected: false
      }
    }

    return itm
  }
}

export function mapOn(o, mapFnc) {
  return o?.map?.(mapFnc)
}

export function first(a) {
  if (Array.isArray(a)) {
    const [f, ...rest] = a
    return f
  }
}

export function fetchIt(data, timeOut) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.error) {
        reject(data.error)
      }

      resolve(data)
    }, timeOut ?? 1500)
  })
}
