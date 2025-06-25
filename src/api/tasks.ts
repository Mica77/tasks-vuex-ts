import type { Task } from '@/types'

export const loadTasks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return [
    <Task>{
      id: 1,
      title: 'Первое задание',
      completed: true,
    },
    <Task>{
      id: 2,
      title: 'Длинный текст задания порплорп орпаорпваорпвпав шгшгнегнке',
      completed: true,
    },
    <Task>{
      id: 3,
      title: 'Невыполненное задание изначально',
      completed: false,
    },
    <Task>{
      id: 4,
      title: '4 задание',
      completed: true,
    },
    <Task>{
      id: 5,
      title: '5. !',
      completed: true,
    },
    <Task>{
      id: 6,
      title: '6. рплорплорп орпаорпаорпаорпа орпваропврпав орпаворапорап',
      completed: true,
    },
  ]
}
