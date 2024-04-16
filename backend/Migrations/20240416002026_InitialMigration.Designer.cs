﻿// <auto-generated />
using System;
using CollaboraCal;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CollaboraCal.Migrations
{
    [DbContext(typeof(CollaboraCalDBContext))]
    [Migration("20240416002026_InitialMigration")]
    partial class InitialMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.3");

            modelBuilder.Entity("CalendarUser", b =>
                {
                    b.Property<int>("CalendarsID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UsersID")
                        .HasColumnType("INTEGER");

                    b.HasKey("CalendarsID", "UsersID");

                    b.HasIndex("UsersID");

                    b.ToTable("CalendarUser");
                });

            modelBuilder.Entity("CollaboraCal.Calendar", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("Calendars");
                });

            modelBuilder.Entity("CollaboraCal.Event", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("CalendarID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("End")
                        .HasColumnType("TEXT");

                    b.Property<string>("Location")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Start")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.HasIndex("CalendarID");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("CollaboraCal.User", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("EMail")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("CalendarUser", b =>
                {
                    b.HasOne("CollaboraCal.Calendar", null)
                        .WithMany()
                        .HasForeignKey("CalendarsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CollaboraCal.User", null)
                        .WithMany()
                        .HasForeignKey("UsersID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CollaboraCal.Event", b =>
                {
                    b.HasOne("CollaboraCal.Calendar", null)
                        .WithMany("Events")
                        .HasForeignKey("CalendarID");
                });

            modelBuilder.Entity("CollaboraCal.Calendar", b =>
                {
                    b.Navigation("Events");
                });
#pragma warning restore 612, 618
        }
    }
}
