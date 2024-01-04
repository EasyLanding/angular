import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ApiServiceService,
  PostI,
  UserCreateI,
  UserI,
} from './api-service.service';

describe('ApiServiceService', () => {
  let service: ApiServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiServiceService],
    });
    service = TestBed.inject(ApiServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get posts', () => {
    const mockPosts: PostI[] = [
      { userId: 1, id: 1, title: 'mock title', body: 'mock body' },
      { userId: 2, id: 2, title: 'mock title', body: 'mock body' },
    ];
    service.getPosts().subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(mockPosts);
    });
    const req = httpMock.expectOne(`${service.baseUrl}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should get user info', () => {
    const mockUser: UserI = {
      id: 1,
      name: 'mock name',
      username: 'mock username',
      email: 'mock email',
      phone: 'mock phone',
      website: 'mock website',
      address: {
        street: 'mock street',
        suite: 'mock suite',
        city: 'mock city',
        zipcode: 'mock zipcode',
        geo: { lat: 'mock lat', lng: 'mock lng' },
      },
      company: {
        name: 'mock company name',
        catchPhrase: 'mock catch phrase',
        bs: 'mock bs',
      },
    };
    service.getUserInfo(1).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
    const req = httpMock.expectOne(`${service.baseUrl}/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should delete post', () => {
    const mockPost: PostI = {
      userId: 1,
      id: 1,
      title: 'mock title',
      body: 'mock body',
    };
    service.deletePost(1).subscribe((post) => {
      expect(post).toEqual(mockPost);
    });
    const req = httpMock.expectOne(`${service.baseUrl}/posts/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockPost);
  });

  it('should create post', () => {
    const mockPost: PostI = {
      userId: 1,
      id: 1,
      title: 'mock title',
      body: 'mock body',
    };
    service.createPost('mock title', 'mock body').subscribe((post) => {
      expect(post).toEqual({
        title: 'mock title',
        body: 'mock body',
        userId: 1,
      });
    });
    const req = httpMock.expectOne(`${service.baseUrl}/posts/`);
    expect(req.request.method).toBe('POST');
    req.flush(mockPost);
  });

  it('should create user', () => {
    const mockUser: UserCreateI = {
      username: 'mock username',
      password: 'mock password',
      email: 'mock email',
    };
    service.createUser(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should get info user', () => {
    const mockUser: UserCreateI = {
      username: 'mock username',
      password: 'mock password',
      email: 'mock email',
    };
    service.getInfoUser(1).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
    const req = httpMock.expectOne('http://localhost:3000/users/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should get post by id', () => {
    const mockPost: PostI = {
      userId: 1,
      id: 1,
      title: 'mock title',
      body: 'mock body',
    };
    service.getPostById(1).subscribe((post) => {
      expect(post).toEqual(mockPost);
    });
    const req = httpMock.expectOne(`${service.baseUrl}/posts/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost);
  });
});
