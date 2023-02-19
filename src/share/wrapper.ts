export class Wrapper<D> {
  constructor(
    public readonly data: D | null = null,
    public readonly loading = false,
    public readonly error: Error | null = null,
  ) {}
}
