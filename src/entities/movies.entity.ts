import { Entity, Column, PrimaryGeneratedColumn, Check } from "typeorm";

@Entity("movies")
@Check(`"duration" > 0 and "price" > 0`)
class Movie {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50, unique: true, nullable: false })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string | null | undefined;

  @Column({ type: "int", nullable: false })
  duration: number;

  @Column({ type: "int", nullable: false })
  price: number;
}

export { Movie };
