import React from 'react'
import { DragDropContext } from "react-beautiful-dnd"
import { ImpulseSpinner } from 'react-spinners-kit'

import Layout from '../plumbing/components/Layout'
import Spinner from '../plumbing/components/Spinner'
import PlotOptionsPicker from '../plumbing/components/PlotOptions'
import PlotOptionsApplied from '../plumbing/components/PlotOptionSelected'
import { ChartCard, OptionsCards } from '../plumbing/components/Cards'

import LineChart from "./LineChart";
import usePlottingColumns from './data/usePlottingColumns'
import { first, mapToDraggableItem, toggleSelected } from './helpers'


export default function Plotter() {
  const measure = usePlottingColumns('measure')
  const dimension = usePlottingColumns('dimension')

  const handleOnDragEnd = React.useCallback((results, provided) => {
    if (results.type === 'dimension') {
      dimension.updateColumns((col) => col
        ?.map
        ?.(toggleSelected(results, { clear: true })))
    }

    if (results.type === 'measure') {
      measure.updateColumns((col) => col
        ?.map
        ?.(toggleSelected(results)))
    }
  }, [dimension.updateColumns, measure.updateColumns])

  const handleOnClearDimensionFilter = React.useCallback(() => {
    dimension.updateColumns((col) => col
      ?.map
      ?.((itm) => ({ ...itm, isSelected: false })))
  }, [dimension.updateColumns])

  const handleOnClearMeasuresFilter = React.useCallback(() => {
    measure.updateColumns((col) => col
      ?.map
      ?.((itm) => ({ ...itm, isSelected: false })))
  }, [measure?.columns, measure.updateColumns])

  return (
    <Layout>
      <DragDropContext
        onDragEnd={handleOnDragEnd}
      >
        <OptionsCards>
          <PlotOptionsPicker
            type="dimension"
            droppableId="dimension-select"
            label="Dimension"
          >
            <Spinner show={dimension.isFetching} />
            {mapToDraggableItem(dimension.getUnselected(), { color: 'blue' })}
          </PlotOptionsPicker>

          <PlotOptionsPicker
            type="measure"
            label="Measures"
            droppableId="measure-select"
          >
            <Spinner show={dimension.isFetching} />
            {mapToDraggableItem(measure.getUnselected(), { color: 'green' })}
          </PlotOptionsPicker>
        </OptionsCards>

        <ChartCard>
          <PlotOptionsApplied
            label="Dimension"
            area="dimension"
            type="dimension"
            onClear={handleOnClearDimensionFilter}
          >
            {mapToDraggableItem(dimension.getSelected(), { color: 'blue' })}
          </PlotOptionsApplied>

          <PlotOptionsApplied
            label="Measures"
            area="measure"
            type="measure"
            onClear={handleOnClearMeasuresFilter}
          >
            {mapToDraggableItem(measure.getSelected(), { color: 'green' })}
          </PlotOptionsApplied>

          <LineChart
            filters={{
              dimension: first(dimension?.getSelected())?.name,
              measures: measure?.getSelected()?.map?.(({ name }) => name),
            }}
          />
        </ChartCard>
      </DragDropContext>
    </Layout>
  );
}

