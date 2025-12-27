class l {
  constructor(s) {
    this.order = s, this.data = new Float64Array(
      this.order * this.order + this.order + this.order
    ), this.a = [];
    for (let r = 0; r < this.order; r++)
      this.a.push(
        this.data.subarray(r * this.order, (r + 1) * this.order)
      );
    this.b = this.data.subarray(
      this.order * this.order,
      this.order * (1 + this.order)
    ), this.c = this.data.subarray(
      this.order * (1 + this.order),
      this.order * (2 + this.order)
    );
  }
  a;
  b;
  c;
  data;
  toString() {
    let s = "";
    for (let r = 0; r < this.order; r++)
      s += `${this.c[r]} : `, s += `${this.a[r].join(" ")}`, s += `
`;
    return s += `	 : ${this.b.join(" ")}
`, s;
  }
  makeItConsistent() {
    return this.a.forEach((s, r) => {
      this.c[r] = 0;
      for (let a = 0; a < this.order; a++)
        this.c[r] += s[a];
    }), this;
  }
}
class d {
  constructor(s, r) {
    this.butcherTableau = s, this.f = r, this.k = new Array(this.order);
  }
  k;
  get order() {
    return this.butcherTableau.order;
  }
  stepInto(s, r, a, i) {
    this.updateK(s, r, a);
    for (let e = 0; e < a.length; e++) {
      i[e] = a[e];
      for (let h = 0; h < this.order; h++)
        i[e] += s * this.butcherTableau.b[h] * this.k[h][e];
    }
    return this;
  }
  step(s, r, a) {
    const i = new Float64Array(a.length);
    return this.stepInto(s, r, a, i), i;
  }
  stepsInto(s, r, a, i, e) {
    for (let h = 0; h < i.length; h++)
      e[h] = i[h];
    for (; s > 0; s--)
      this.stepInto(r, a, e, e), a += r;
    return this;
  }
  steps(s, r, a, i) {
    const e = new Float64Array(i.length);
    return this.stepsInto(s, r, a, i, e), e;
  }
  updateK(s, r, a) {
    const i = new Float64Array(a.length);
    for (let e = 0; e < this.order; e++) {
      for (let h = 0; h < a.length; h++) {
        i[h] = 0;
        for (let o = 0; o < e; o++)
          i[h] += this.butcherTableau.a[e][o] * this.k[o][h];
        i[h] *= s, i[h] += a[h];
      }
      this.k[e] = this.f(r + s * this.butcherTableau.c[e], i);
    }
  }
}
const t = new l(7);
t.a[1][0] = 1 / 5;
t.a[2][0] = 3 / 40;
t.a[2][1] = 9 / 40;
t.a[3][0] = 44 / 45;
t.a[3][1] = -56 / 15;
t.a[3][2] = 32 / 9;
t.a[4][0] = 19372 / 6561;
t.a[4][1] = -25360 / 2187;
t.a[4][2] = 64448 / 6561;
t.a[4][3] = -212 / 729;
t.a[5][0] = 9017 / 3168;
t.a[5][1] = -355 / 33;
t.a[5][2] = 46732 / 5247;
t.a[5][3] = 49 / 176;
t.a[5][4] = -5103 / 18656;
t.a[6][0] = 35 / 384;
t.a[6][1] = 0;
t.a[6][2] = 500 / 1113;
t.a[6][3] = 125 / 192;
t.a[6][4] = -2187 / 6784;
t.a[6][5] = 11 / 84;
t.makeItConsistent();
t.b[0] = 35 / 384;
t.b[1] = 0;
t.b[2] = 500 / 1113;
t.b[3] = 125 / 192;
t.b[4] = -2187 / 6784;
t.b[5] = 11 / 84;
t.b[6] = 0;
export {
  l as ButcherTableau,
  d as RungeKutta,
  t as rkdp45ButcherTableau
};
