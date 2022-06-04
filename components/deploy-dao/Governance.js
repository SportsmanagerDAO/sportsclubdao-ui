import React, { useState } from 'react'
import { Button, Flex } from '../../styles/elements'
import { Input, Form, FormElement, Label, Switch, Checkbox } from '../../styles/form-elements'
import { Select } from '../../styles/form-elements/Select'
import { useForm, Controller } from 'react-hook-form'
import { useStateMachine } from 'little-state-machine'
import updateAction from './updateAction'
import { Tip } from '../elements/'

export default function Governance({ setStep, hardMode }) {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { actions, state } = useStateMachine({ updateAction })

  const onPrevious = (data) => {
    actions.updateAction(data)

    setStep('id')
  }

  const onNext = (data) => {
    actions.updateAction(data)

    if (!hardMode) {
      setStep('founders')
    } else {
      setStep('apps')
    }
  }

  return (
    <Form>
      <FormElement>
        <Label htmlFor="votingPeriod">Voting Period</Label>
        <Flex
          css={{
            '&:hover': {
              boxShadow: '-2px 0px 20px 3px #ffa00a',
            },
          }}
        >
          <Input
            variant="voting"
            type="number"
            id="quorum"
            placeholder="5"
            {...register('votingPeriod', { required: true })}
            defaultValue={state.votingPeriod}
            css={{
              '&:hover': {
                boxShadow: 'none',
              },
            }}
          />
          <Select
            {...register('votingPeriodUnit')}
            defaultValue={state.votingPeriodUnit}
            onValueChange={(value) => setValue('votingPeriodUnit', value)}
          >
            <Select.Item value="min">minutes</Select.Item>
            <Select.Item value="hour">hours</Select.Item>
            <Select.Item value="day">days</Select.Item>
          </Select>
        </Flex>
      </FormElement>
      <FormElement>
        <Label htmlFor="quorum">
          Participation Needed
          <Tip label="Minimum percentage of voters required for a proposal to meet quorum." />
        </Label>
        <Flex dir="col" gap="sm">
          <Input
            type="number"
            id="quorum"
            placeholder="20"
            aria-invalid={errors.quorum ? 'true' : 'false'}
            min="0"
            max="100"
            {...register('quorum', { required: true })}
            defaultValue={state.quorum}
          />
          {errors.quorum && errors.quorum.type === 'required' && <span>Participation percentage is required.</span>}
        </Flex>
      </FormElement>
      <FormElement>
        <Label htmlFor="approval">Approval Needed</Label>
        <Flex dir="col" gap="sm">
          <Input
            type="number"
            id="approval"
            placeholder="60"
            min="51"
            max="100"
            aria-invalid={errors.approval ? 'true' : 'false'}
            {...register('approval', { required: true })}
            defaultValue={state.approval}
          />
          {errors.approval && errors.approval.type === 'required' && <span>Approval percentage is required.</span>}
        </Flex>
      </FormElement>
      <FormElement>
        <Label htmlFor="paused">Token Transferability</Label>
        <Checkbox type="checkbox" {...register('transferability')} control={control} name="transferability" value="transferability" defaultValue={state.transferability} />
      </FormElement>
      <Flex css={{ justifyContent: 'flex-end' }}>
        <Button variant="transparent" onClick={handleSubmit(onPrevious)}>
          Previous
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit(onNext)}>
          Next
        </Button>
      </Flex>
    </Form>
  )
}
