import { Uuid } from "../../../shared/domain/value-objects/uuid.vo"
import { Category } from "../category.entity"


describe('Category Unit Tests', () => {
  let validateSpy: any
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate")
  })
  describe('constructor', () => {
  test('should create a category with default values', () => {
    let category = new Category({
      name: 'Movie',
    })

    expect(category.category_id).toBeInstanceOf(Uuid)
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

  expect(category.category_id).toBeInstanceOf(Uuid)
  expect(category.name).toBe('Movie')
  expect(category.description).toBe('New movie')
  expect(category.is_active).toBe(false)
  expect(category.created_at).toBeInstanceOf(Date)
})

  test('should create a category with all values', () => {
    const created_at = new Date()
    const category = new Category({
      name: 'Movie',
      description: 'New movie',
      is_active: false,
      created_at
    })

    expect(category.category_id).toBeInstanceOf(Uuid)
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

    expect(category.category_id).toBeInstanceOf(Uuid)
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

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    });

    test('should create a category with a description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'Some description'
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBe('Some description')
      expect(category.is_active).toBe(true)
      expect(category.created_at).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    });
    test('should create a category with is_active', () => {
      const category = Category.create({
        name: 'Movie',
        is_active: false
      })

      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(category.name).toBe('Movie')
      expect(category.description).toBeNull()
      expect(category.is_active).toBe(false)
      expect(category.created_at).toBeInstanceOf(Date)
      expect(validateSpy).toHaveBeenCalledTimes(1)
    });
  })
  
  describe('category_id field', () => {
    const arrange = [
      { id: null}, {id: undefined}, {id: new Uuid()}
    ]
    test.each(arrange)('id = %j', ({ id }) => {
      const category = Category.create({
        name: 'Movie',
        category_id: id as any,
      })
      expect(category.category_id).toBeInstanceOf(Uuid)
      expect(validateSpy).toHaveBeenCalledTimes(1)
      if(id instanceof Uuid){
        expect(category.category_id).toBe(id) 
      }
    })
  })
  

  test('should change name', () => {
    const category = Category.create({
      name: 'Movie',
    })

    category.changeName('other name')
    expect(category.name).toBe('other name')
    expect(validateSpy).toHaveBeenCalledTimes(2)
  });
  test('should change description', () => {
    const category = Category.create({
      name: 'Movie',
      description: 'Old description'
    })

    category.changeDescription('other description')
    expect(category.description).toBe('other description')
    expect(validateSpy).toHaveBeenCalledTimes(2)
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

describe('Category Validator', () => {
   describe("create method", () => {
    it("should a invalid category using name property", () => {
      expect(() => new Category({ name: null })).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => new Category({ name: "" })).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => new Category({ name: 5 as any })).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
      
      expect(
        () => new Category({ name: "t".repeat(256) })
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should a invalid category using description property", () => {
      expect(
        () => new Category({ description: 5 } as any)
      ).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("should a invalid category using is_active property", () => {
      expect(() => new Category({ is_active: 5 } as any)).containsErrorMessages(
        {
          is_active: ["is_active must be a boolean value"],
        }
      );
    });
  })
})