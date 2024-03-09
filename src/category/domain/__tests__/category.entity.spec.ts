import { Category } from "../category.entity"

describe('Category Unit Tests', () => {
  describe('constructor', () => {
   test('should create a category with default values', () => {
    let category = new Category({
      name: 'Movie',
    })

    expect(category.category_id).toBeUndefined()
    expect(category.name).toBe('Movie')
    expect(category.description).toBeNull()
    expect(category.is_active).toBe(true)
    expect(category.created_at).toBeInstanceOf(Date)

    const created_at = new Date()
    category = new Category({
    name: 'Movie',
    description: 'New movie',
    is_active: false,
    created_at
  })

  expect(category.category_id).toBeUndefined()
  expect(category.name).toBe('Movie')
  expect(category.description).toBe('New movie')
  expect(category.is_active).toBe(false)
  expect(category.created_at).toBeInstanceOf(Date)
   })

   test('should create a category with all values', () => {
    const created_at = new Date()
    const category = new Category({
      category_id: '1',
      name: 'Movie',
      description: 'New movie',
      is_active: false,
      created_at
    })

    expect(category.category_id).toBe('1')
    expect(category.name).toBe('Movie')
    expect(category.description).toBe('New movie')
    expect(category.is_active).toBe(false)
    expect(category.created_at).toBe(created_at)  
   })
   test('should create a category with name and description', () => {
    const category = new Category({
      name: 'Movie',
      description: 'New movie',
    })

    expect(category.category_id).toBeUndefined()
    expect(category.name).toBe('Movie')
    expect(category.description).toBe('New movie')
    expect(category.is_active).toBe(true)
    expect(category.created_at).toBeInstanceOf(Date) 
   })
  })

  describe('create command', () => {
    test('should create a category', () => {
      const category = Category.create({
        name: 'Movie',
      })

      expect(category.category_id).toBeUndefined()
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
    });

    test('should create a category with a description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Some description'
      })

      expect(category.category_id).toBeUndefined()
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Some description')
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
    });
    test('should create a category with is_active', () => {
      const category = Category.create({
        name: 'Movie',
        is_active: false
      })

      expect(category.category_id).toBeUndefined()
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(false)
      expect(category.created_at).toBeInstanceOf(Date)
    });
  })
  
  test('should change name', () => {
    const category = new Category({
      name: 'Movie',
    })

    category.changeName('other name')
    expect(category.name).toBe('other name')
  });
  test('should change description', () => {
    const category = new Category({
      name: 'Movie',
      description: 'Old description'
    })

    category.changeDescription('other description')
    expect(category.description).toBe('other description')
  });
  test('should activate a category', () => {
    const category = new Category({
      name: 'Movie',
      is_active: false
    })

    category.activate()
    expect(category.is_active).toBe(true)
  });
  test('should deactivate a category', () => {
    const category = new Category({
      name: 'Movie',
    })

    category.deactivate()
    expect(category.is_active).toBe(false)
  });
})
